module.exports = mongoose => {

  let schema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'You must enter your name.'],
    },
    email: {
      type: String,
      required: [true, 'You must enter your email'],
      lowercase: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, '{VALUE} is not a valid email'],
      validate: {
        validator: function (value) {
          return this.model('user').findOne({
            email: value
          }).then(User => !User)
        },
        message: props => `${props.value} is already used by another user`
      },
    },
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      required: [true, 'You need a password'],
      select: false,
    }
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
}