let requestorUserId,projectId,page,limit
// const pipeline = [
//     // Step 1: Match tickets for the requestor's userId or projectId
//     {
//       $match: {
//         $or: [
//           { creatorId: requestorUserId },
//           { projectId: projectId }
//         ]
//       }
//     },
//     // Step 2: Lookup ProjectSharing for the requestor's userId and projectId
//     {
//       $lookup: {
//         from: "projectsharings", // Replace with your ProjectSharing collection name
//         let: { projectId: "$projectId", userId: requestorUserId },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   { $eq: ["$projectId", "$$projectId"] },
//                   {
//                     $elemMatch: {
//                       childOrgs: { userId: "$$userId" }
//                     }
//                   }
//                 ]
//               }
//             }
//           },
//           {
//             $project: {
//               childOrgs: 1
//             }
//           }
//         ],
//         as: "projectDetails"
//       }
//     },
//     // Step 3: Unwind projectDetails
//     {
//       $unwind: "$projectDetails"
//     },
//     // Step 4: Extract primaryUser and related users based on parentId
//     {
//       $addFields: {
//         primaryUser: {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$projectDetails.childOrgs",
//                 as: "child",
//                 cond: { $eq: ["$$child.primaryUser", true] }
//               }
//             },
//             0
//           ]
//         },
//         relatedUsers: {
//           $filter: {
//             input: "$projectDetails.childOrgs",
//             as: "child",
//             cond: { $eq: ["$$child.parentId", "$primaryUser.userId"] }
//           }
//         }
//       }
//     },
//     // Step 5: Lookup tickets for related users
//     {
//       $lookup: {
//         from: "tickets", // Replace with your Ticket collection name
//         localField: "relatedUsers.userId",
//         foreignField: "creatorId",
//         as: "relatedTickets"
//       }
//     },
//     // Step 6: Combine requestor's tickets and related tickets
//     {
//       $addFields: {
//         allTickets: {
//           $concatArrays: ["$relatedTickets", "$$ROOT"]
//         }
//       }
//     },
//     // Step 7: Flatten tickets and add primary user info
//     {
//       $unwind: "$allTickets"
//     },
//     {
//       $addFields: {
//         "allTickets.primaryUserName": "$primaryUser.userName",
//         "allTickets.primaryUserId": "$primaryUser.userId"
//       }
//     },
//     // Step 8: Project required fields
//     {
//       $project: {
//         _id: "$allTickets._id",
//         creatorId: "$allTickets.creatorId",
//         projectId: "$allTickets.projectId",
//         clockIn: "$allTickets.clockIn",
//         clockOut: "$allTickets.clockOut",
//         primaryUserName: "$allTickets.primaryUserName",
//         primaryUserId: "$allTickets.primaryUserId"
//       }
//     },
//     // Step 9: Pagination and Sorting
//     {
//       $sort: { clockIn: -1 } // Sort by clock-in time
//     },
//     {
//       $skip: (page - 1) * limit // Pagination: replace page and limit with variables
//     },
//     {
//       $limit: limit
//     }
//   ];
  
let pipeline = [
    // Step 1: Match tickets for the requestor's project and user
    {
      $match: {
        $or: [
          { creatorId: "REQUESTOR_USER_ID" }, // Replace with the requestor's user ID
          { projectId: "PROJECT_ID" }        // Replace with the relevant project ID
        ]
      }
    },
    // Step 2: Lookup ProjectSharing details for the project and requestor
    {
      $lookup: {
        from: "projectsharings", // Replace with your actual ProjectSharing collection name
        let: { projectId: "$projectId", userId: "$creatorId" },
        pipeline: [
          {
            $match: {
              $expr: { 
                $and: [
                  { $eq: ["$projectId", "$$projectId"] },
                  { $in: ["$$userId", "$accessUserId"] } // Ensure we only find records for the requestor
                ]
              }
            }
          },
          {
            $limit: 1 // Ensure only one record is returned
          }
        ],
        as: "projectDetails"
      }
    },
    // Step 3: Unwind project details to access childOrg array
    {
      $unwind: "$projectDetails"
    },
    // Step 4: Extract primary users and related users
    {
      $addFields: {
        primaryUsers: {
          $filter: {
            input: "$projectDetails.childOrgs",
            as: "child",
            cond: { $eq: ["$$child.primaryUser", true] }
          }
        },
        relatedUsers: {
          $filter: {
            input: "$projectDetails.childOrgs",
            as: "child",
            cond: {
              $in: ["$$child.parentId", {
                $map: { input: "$projectDetails.childOrgs", as: "pu", in: "$$pu.userId" }
              }]
            }
          }
        }
      }
    },
    // Step 5: Lookup tickets for primary and related users
    {
      $lookup: {
        from: "tickets", // Replace with your actual Tickets collection name
        let: {
          userIds: {
            $concatArrays: [
              { $map: { input: "$primaryUsers", as: "pu", in: "$$pu.userId" } },
              { $map: { input: "$relatedUsers", as: "ru", in: "$$ru.userId" } }
            ]
          }
        },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$creatorId", "$$userIds"] }
            }
          }
        ],
        as: "allTickets"
      }
    },
    // Step 6: Unwind tickets to get individual ticket records
    {
      $unwind: "$allTickets"
    },
    // Step 7: Add primary user info to each ticket
    {
      $addFields: {
        "allTickets.primaryUser": {
          $arrayElemAt: [
            {
              $filter: {
                input: "$primaryUsers",
                as: "pu",
                cond: { $eq: ["$$pu.userId", "$allTickets.creatorId"] }
              }
            },
            0
          ]
        }
      }
    },
    // Step 8: Project required ticket details along with primary user info
    {
      $project: {
        _id: "$allTickets._id",
        creatorId: "$allTickets.creatorId",
        projectId: "$allTickets.projectId",
        clockIn: "$allTickets.clockIn",
        clockOut: "$allTickets.clockOut",
        primaryUserName: "$allTickets.primaryUser.userName",
        primaryUserId: "$allTickets.primaryUser.userId"
      }
    },
    // Step 9: Pagination (skip and limit)
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: 0 }, // Replace with the desired offset for pagination
          { $limit: 10 } // Replace with the desired limit per page
        ]
      }
    }
  ]
  
  