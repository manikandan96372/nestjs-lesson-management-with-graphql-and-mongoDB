import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateStudent } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid'

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}

    async createStudent(createStudent: CreateStudent) {
        const { firstName, lastName } = createStudent
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })
        return this.studentRepository.save(student)
    }

    async student(id: string) {
        return await this.studentRepository.findOne({ id })
    }

    async students() {
        return await this.studentRepository.find()
    }
    
}
