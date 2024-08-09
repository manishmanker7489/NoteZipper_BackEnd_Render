import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Data base Conneted");
    }).catch((err) => {
        console.log(err.message);
        process.exit();
    }
    )
}