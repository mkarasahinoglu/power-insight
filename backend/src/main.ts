import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { AppModuleV2 } from "./appV2.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const app = await NestFactory.create(AppModuleV2)
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3000)
}
bootstrap()
