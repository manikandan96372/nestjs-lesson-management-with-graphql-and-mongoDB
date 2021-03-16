import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { LessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) {}

    async getLesson(id) {
        return await this.lessonRepository.findOne({ id })
    }

    async getLessons() {
        return await this.lessonRepository.find()
    }

    async createLesson(createLessonInput: LessonInput) {
        const { name, startDate, endDate } = createLessonInput
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students: []
        })
        return await this.lessonRepository.save(lesson)
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]) {
        const lessons = await this.lessonRepository.findOne({ id: lessonId })
        lessons.students = [...lessons.students, ...studentIds]
        return await this.lessonRepository.save(lessons)
    }
}
