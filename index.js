require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const userRouter = require("./router/user")
const postRouter = require("./router/post")
const communityRouter = require("./router/community")
const multer = require("multer")
const path = require("path")
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use("/images", express.static(path.join(__dirname, "public/images")))
//http://localhost:5000/images/123.PNG

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/images")
    },
    filename: (request, file, cb) => {
        cb(null, /*file.originalname для постмана?)*/ request.body.name)
    }
})

const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api", userRouter)
app.use("/api", postRouter)
app.use("/api", communityRouter)

app.use(errorMiddleware) //middleware для обработки ошибок должен быть в самом конце middlewar'ov

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("DB Connection Successfull"))
            .catch((error) => console.log(error))

        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
