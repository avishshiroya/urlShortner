//change the clockouts entities name

db.clockouts.updateMany({}, {
    $rename: { "timecardId": "temp_timecardUniqueId" }
});


db.clockouts.updateMany({}, {
    $rename: { "clockInId": "timecardId" }
});


db.clockouts.updateMany({}, {
    $rename: { "temp_timecardUniqueId": "timecard" }
});


