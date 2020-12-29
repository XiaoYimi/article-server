module.exports = {
  name: 'user',
  schema: {
    id: { type: Number, min: 0, unique: true },
    username: { type: String, tirm: true },
    password: { type: String, tirm: true },
    mobile: { type: String, tirm: true, unique: true },
    state: { type: Boolean, default: true }
  },
  indexs: [
    { mobile: 1 }
  ],
  incrementid: 'id'
}
