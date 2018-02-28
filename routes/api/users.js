const router = require("express").Router();
const userController = require("../../controllers/userController");

	// Matches with "/api/users" - find all users, create new user
	router.route("/")
	  .get(userController.findAll)
	  .post(userController.create);

	// Matches with "/api/users/:id" - find/update/delete user by ID
	router.route("/:id")
	  .get(userController.findById)
	  .put(userController.update)
	  .delete(userController.remove);

	//Matches with "/api/users/interests/:userid&:interestid" - remove an interest/fandom association from a user
	router.route("/interests/:userid&:interestid")
		.delete(userController.removeInterestFandom);

module.exports = router;