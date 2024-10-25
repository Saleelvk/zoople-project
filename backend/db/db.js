const mongoose =require('mongoose');
const  connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_url)
        console.log('dataBase connected')
        
    } catch (error) {
        console.log(error)
    }

}
module.exports = connectDB