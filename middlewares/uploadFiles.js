const multer = require("multer");

module.exports = {
  artistImg: (imgArtist) => {
    // define upload folder destination
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // folder name to store artist image
        cb(null, "uploads/artist");
      },
      filename: (req, file, cb) => {
        // rename file upload with adding date as a firstname
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      },
    });

    // filtering image extension
    const fileFilter = (req, file, cb) => {
      // check if file is exist
      if (file.fieldname === imgArtist) {
        // define allowed extension
        if (
          !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/
          )
        ) {
          // if did not match allow extension
          req.fileValidationError = {
            message: "Only image files are allowed",
          };
          return cb(new Error("Only image files are allowed"), false);
        }
      }
      cb(null, true);
    };

    // set max size image file
    const maxSize = 10 * 1024 * 1024;

    // call multer for upload single file
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: maxSize,
      },
    }).single(imgArtist);

    // set flash message
    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          if (err.code == "LIMIT_FILE_SIZE") {
            req.session.message = {
              type: "red",
              message: "Error, max file size 10MB",
            };
            return res.redirect(req.originalUrl);
          }
          req.session.message = {
            type: "danger",
            message: err,
          };

          req.flash("error", err);
          return res.redirect(req.originalUrl);
        }
        return next();
      });
    };
  },

  profileImg: (imgName) => {
    // define upload folder destination
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // folder name to store artist image
        cb(null, "uploads/profile");
      },
      filename: (req, file, cb) => {
        // rename file upload with adding date as a firstname
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      },
    });

    // filtering image extension
    const fileFilter = (req, file, cb) => {
      // check if file is exist
      if (file.fieldname === imgName) {
        // define allowed extension
        if (
          !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/
          )
        ) {
          // if did not match allow extension
          req.fileValidationError = {
            message: "Only image files are allowed",
          };
          return cb(new Error("Only image files are allowed"), false);
        }
      }
      cb(null, true);
    };

    // set max size image file
    const maxSize = 10 * 1024 * 1024;

    // call multer for upload single file
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: maxSize,
      },
    }).single(imgName);

    // set flash message
    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          if (err.code == "LIMIT_FILE_SIZE") {
            req.session.message = {
              type: "red",
              message: "Error, max file size 10MB",
            };
            return res.redirect(req.originalUrl);
          }
          req.session.message = {
            type: "danger",
            message: err,
          };

          req.flash("error", err);
          return res.redirect(req.originalUrl);
        }
        return next();
      });
    };
  },

  musicData: (img, music) => {
    // define upload destination
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === img) {
          cb(null, "uploads/cover");
        } else if (file.fieldname === music) {
          cb(null, "uploads/music");
        }
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      },
    });

    const fileFilter = function (req, file, cb) {
      if (file.fieldname === music) {
        if (!file.originalname.match(/\.(mp3|MP3)$/)) {
          req.fileValidationError = {
            message: "Only image and mp3 files are allowed",
          };
          return cb(new Error("Only image and mp3 files are allowed"), false);
        }
      } else if (file.fieldname === img) {
        if (
          !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/
          )
        ) {
          req.fileValidationError = {
            message: "Only image and mp3 files are allowed",
          };
          return cb(new Error("Only image and mp3 files are allowed"), false);
        }
      }
      cb(null, true);
    };

    // set max file size
    const maxSize = 30 * 1024 * 1000;

    // generate multer upload
    const upload = multer({
      storage,
      fileFilter,
      limits: {
        fileSize: maxSize,
      },
    });

    const uploadMultiple = upload.fields([
      { name: img, maxCount: 1 },
      { name: music, maxCount: 1 },
    ]);

    //middleware
    return (req, res, next) => {
      uploadMultiple(req, res, function (err) {
        if (err) {
          if (err.code == "LIMIT_FILE_SIZE") {
            req.session.message = {
              type: "danger",
              message: "Error, max file size 10MB",
            };
            return res.redirect(req.originalUrl);
          }
          req.session.message = {
            type: "danger",
            message: err,
          };

          req.flash("error", err);
          return res.redirect(req.originalUrl);
        }
        return next();
      });
    };
  },
};
