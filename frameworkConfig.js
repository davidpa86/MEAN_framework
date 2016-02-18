module.exports = {
  serverPort: 3000,
  dbConfig: {
    url: 'mongodb://localhost:27017/banda',
    models: [{
      'concert': {
        date: {
          type: Number,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        place: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        methods : {}
      }
    }]
  }
};
