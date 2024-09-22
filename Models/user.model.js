const mongoose = require(`mongoose`);
const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    family_name: { type: String, required: true },
    given_name: { type: String, required: true },
    picture: { type: String, required: true },
    sub: { type: String, required: true },
    locale: { type: String, required: false },
    name: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  UserModel,
};
