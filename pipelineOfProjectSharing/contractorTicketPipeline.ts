const pipeline: PipelineStage[] = [
    {
      $match: {
        projectId: projectId,
        timecardId: null,
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { userId: { $toObjectId: "$userId" } },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
          { $project: { _id: 1, firstName: 1 } },
        ],
        as: 'ticketCreater',
      },
    },
    { $unwind: { path: '$ticketCreater', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "projectsharings",
        let: { projectId: "$projectId", userId: "$userId", orgId: "$organizationId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$projectId", "$$projectId"] } } },
          { $unwind: "$nodes" },
          { $match: { $expr: { $or: [{ $eq: ["$nodes.userId", "$$userId"] }, { $eq: ["$nodes.organizationId", "$$orgId"] }] } } },
          {
            $project: {
              path: "$nodes.path",
              userId: "$nodes.userId",
              organizationId: "$nodes.organizationId",
              userName: "$nodes.userName",
              organizationName: "$nodes.organziationName",
            },
          },
        ],
        as: "nodes",
      },
    },
    {
      $addFields: {
        orgId: {
          $cond: {
            if: {
              $and: [
                { $isArray: "$nodes" },
                { $gt: [{ $size: "$nodes" }, 0] },
                { $gt: [{ $size: { $first: "$nodes.path" } }, 1] }
              ]
            },
            then: { $toObjectId: { $arrayElemAt: [{ $first: "$nodes.path" }, 1] } },
            else: null
          }
        }
      }
    },
    {
      $lookup: {
        from: "organizations",
        localField: "orgId",
        foreignField: "_id",
        as: "org"
      }
    },
    {
      $addFields: {
        showableName: {
          $cond: {
            if: { $eq: ['$organizationId', user['currentOrganizationId']] },
            then: "$userName",
            else: {
              $cond: {
                if: { $ne: ["$orgId", null] },
                then: { $first: "$org.organizationName" },
                else: 'N / A'
              }
            }
          }
        }
      }
    },
    {
      $match: {
        $or: [{ truckId: new RegExp(search, 'i') }, { showableName: new RegExp(search, 'i'), }]
      }
    },
    {
      $addFields: {
        totalHours: {
          $cond: {
            if: { $eq: ['$isClockOut', true] },
            then: '$totalTime',
            else: {
              $round: [
                {
                  $divide: [
                    { $subtract: [currentTimeMillis, '$clockInTime'] },
                    1000 * 60 * 60, // Convert milliseconds to hours
                  ],
                },
                2,
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        truckId: 1,
        haulerName: 1,
        createdAt: 1,
        userName: 1,
        showableName: 1, // The computed name
        isClockOut: 1,
        truckDriverTicket: 1,
        truckDriverTicketImage: 1,
        truck: 1,
        charge: 1,
        paymentUnit: 1,
        totalHours: 1,
        truckType: 1,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ];