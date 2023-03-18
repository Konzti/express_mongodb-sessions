import mongoose from 'mongoose';

export const connectToDB = async (uri) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};

export const db = mongoose.connection;