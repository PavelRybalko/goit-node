module.exports.v2 = {
  config: () => {},
  uploader: {
    destroy: () => {},
    upload: (first, second, cb) => {
      cb(null, {
        public_id: 1234,
        secure_url: 'avatarUrl',
      })
    },
  },
}
