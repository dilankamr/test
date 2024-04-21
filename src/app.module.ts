import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";
import { Student, StudentSchema } from "./model/schema/student";
import { Project, ProjectSchema } from "./model/schema/project";
import { StudentController } from "./controller/student.controller";
import { StudentService } from "./service/student.service";
import { StudentRepository } from "./repository/student.repository";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_HOST, {
			dbName: process.env.MONGO_DATABASE_NAME,
			user: process.env.MONGO_USERNAME,
			pass: process.env.MONGO_PASSWORD,
			authSource: process.env.MONGO_AUTH_SOURCE
		}),
		MongooseModule.forFeature([
			{name: Student.name, schema: StudentSchema},
			{name: Project.name, schema: ProjectSchema}
		])
	],
	controllers: [
		StudentController
	],
	providers: [
		StudentService,
		StudentRepository
	]
})
export class AppModule {}
