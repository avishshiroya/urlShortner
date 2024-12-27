## migrate_hauler_schema_to_contractor_hauler_relationship
 - first find all hauler
 - find the user on userId
 - find the organization on organizationId



 notification["type"] = "user_invite";
                    notification["senderUserId"] = String(senderData["_id"]);
                    notification["senderUserRole"] = "Contractor";
                    notification["senderUserName"] = `${senderData["firstName"]} ${senderData["lastName"]}`;
                    notification["senderUserOrganizationId"] = String(senderOrganizationData["_id"]);
                    notification["senderUserOrganizationName"] = String(senderOrganizationData["organizationName"]);
                    notification["senderUserOrganizationImage"] = senderOrganizationData["organizationImage"];
                    notification["receiverUserId"] = receiverData ? String(receiverData["_id"]) : null;
                    notification["receiverUserRole"] = "Contractor";
                    notification["receiverUserName"] = receiverData["firstName"] ? `${receiverData["firstName"]} ${receiverData["lastName"]}` : `${notification["firstName"]} ${notification["lastName"]}`;
                    notification["receiverUserMobileNumber"] = notification["mobileNumber"];
                    notification["receiverUserOrganizationId"] = String(receiverOrganizationData?.["_id"]) || null;
                    notification["receiverUserOrganizationName"] = String(receiverOrganizationData?.["organizationName"]) || null;
                    notification["receiverUserOrganizationImage"] = receiverOrganizationData?.["organizationImage"] || null;
                    notification["organizationMemberId"] = String(orgMemeber?.["_id"])
                    notification["isActionable"] = notification["status"] == "Requested" ? true :false;
                    notification["message"] = {
                        "en": "You've been invited to join the organization.",
                        "fr": "Vous avez été invité à rejoindre l'organisation.",
                        "es": "Has sido invitado a unirte a la organización."
                    }