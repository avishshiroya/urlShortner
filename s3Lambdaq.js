import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import AdmZip from "adm-zip";

const s3 = new S3Client({ region: "us-east-1" });
const bucketName = "your-bucket-name";

export const handler = async (event) => {
    const objectKey = event.Records[0].s3.object.key;

    // Get ZIP file from S3
    const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
    const { Body } = await s3.send(command);
    const zipBuffer = await Body.transformToByteArray();

    // Extract ZIP
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();

    for (const entry of zipEntries) {
        if (!entry.isDirectory) {
            const extractedData = entry.getData();
            const extractedKey = objectKey.replace(".zip", "/") + entry.entryName;

            // Upload extracted file back to S3
            const uploadCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: extractedKey,
                Body: extractedData,
            });

            await s3.send(uploadCommand);
        }
    }

    return { status: "Success", extractedFiles: zipEntries.map(e => e.entryName) };
};


db.clockins.updateMany(
    { "truckDetail.additionalDocuments": { $type: "string" } },
    [
        {
            $set: {
                truckDetail: {
                    $map: {
                        input: "$truckDetail",
                        as: "truck",
                        in: {
                            $mergeObjects: [
                                "$$truck",
                                {
                                    additionalDocuments: {
                                        $cond: {
                                            if: { $eq: [{ $type: "$$truck.additionalDocuments" }, "string"] },
                                            then: {
                                                $cond: {
                                                    if: {
                                                        $eq: ["$$truck.additionalDocuments", ""]
                                                    },
                                                    then: [],
                                                    else: ["$$truck.additionalDocuments"]
                                                },  // Convert string to array
                                            },
                                            else: "$$truck.additionalDocuments"  // Keep existing arrays intact
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]
);
