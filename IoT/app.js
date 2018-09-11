// fc:a6:67:d5:0a:9d

const dashButton = require("node-dash-button");

const dash = dashButton("fc:a6:67:d5:0a:9d", null, null, "all");

const apn = require("apn");

const options = {
  token: {
    key: "/Users/matthewbrand/Desktop/JS/IoT/AuthKey_RMGWU6D63K.p8",
    keyId: "RMGWU6D63K",
    teamId: "6LFSKVJ7Z5"
  },
  production: false
};

const apnProvider = new apn.Provider(options);

const deviceToken =
  "142eaa79779314e506c35c471eb49318e3ba643aae49cc665c7fcb36121f5f09";

const notification = new apn.Notification({
  alert: "PATIENT NEEDS HELP",
  sound: "chime.caf",
  mutableContent: 1,
  topic: "com.matthewbrand.IoT",
  payload: {
    sender: "node-apn"
  }
});

dash.on("detected", () => {
  apnProvider.send(notification, deviceToken).then(result => {
    // see documentation for an explanation of result
    console.log(result);
    console.log(result.failed);
  });
});
