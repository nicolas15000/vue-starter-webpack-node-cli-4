module.exports = {
    // IN CASE THE USERS DATA MODEL IS EMPTY, WE NEED TO BUILD AN ADMIN
    insertAdmin: function(middleware, bcrypt, db) {
        var admin = {
            nom: "admin",
            prenom: "admin",
            phone: "",
            profession: "",
            email: "admin@admin.com",
            password: "$2a$10$VEG2PKwjp5VzebdKCTF0Nu1v1jcyUuB.mXKwd3NJ2uH6XVrxAeKTG",
            img: "",
            filenames: [],
            role: "administrator",
            permissions: middleware.create_permissions("administrator"),
            filenames: [],
            groups: [],
            social_messages: [],
            last_update: new Date(),
            job: "Administrator",
            mentra: "Im the admin"
        };


        admin.middleware = middleware.create_permissions(admin);

        // HASCHAGE BCRYPT DU PASSWORD
        var hash = bcrypt.hashSync(admin.password, 10);
        admin.password = hash;

        // CONTROLE DE DOUBLONS EMAIL
        db.collection("users").findOne({ email: admin.email }, function(
            findErr,
            result
        ) {
            if (!result) {
                db.collection("users").insertOne(admin);
                console.log("added one admin account");
            } else {
                console.log("admin already exists");
                return;
            }
        });
    },
    // IN CASE THE JOBS DATA MODEL IS EMPTY, WE NEED TO INSERT SOME
    insertJobs: function(middleware, db) {
        console.log("INSERTJOBS");
        var jobs = [{ name: "developper" }, { name: "cto" }, { name: "gamer" }];
        db.collection("jobs").count(function(err, count) {
            if (!err && count === 0) {
                db.collection("jobs").insertMany(jobs);
            }
        });
    }
};