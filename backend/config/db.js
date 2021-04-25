import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.brightCyan.italic)
  } catch (error) {
    console.error(
      `Error occured while connecting to MongoDB: ${error.message}`.red
        .underline.bold
    )
    process.exit(1)
  }
}

export default connectDB
