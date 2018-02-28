USE roundrobin_db;

INSERT INTO events (eventName, organizerAka, signupDeadline, shipDeadline, isPrivate, aboutEvent, categoryId, userId, matchOptionId, statusId)
VALUES 
				("Craft Test", "Crafty McCrafterson", "2018-01-01 00:00:00", "2018-02-01 00:00:00", false, "Test Event", 1, 1, 1, 1),
				("Food Test", "", "", "", false, "", 2, 2, 1, 1),
				("Books Test", "", "", "", true, "", 3, 3, 2, 1),
				("Gift Test", "", "", "", false, "", 4, 4, 1, 1),
				("Cards Test", "", "", "", true, "", 5, 5, 1, 3);