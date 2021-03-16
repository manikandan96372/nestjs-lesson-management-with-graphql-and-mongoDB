import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateStudent } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService){}

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudent') createStudent: CreateStudent) {
        return this.studentService.createStudent(createStudent)
    }

    @Query(returns => StudentType)
    student(@Args('id') id: string) {
        return this.studentService.student(id)
    }

    @Query(returns => [StudentType])
    students() {
        return this.studentService.students()
    }

}