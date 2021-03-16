import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { AssignStudentsToLesson } from "./assign-students-to-lesson.input"

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}
    @Query(returns => LessonType)
    lesson(@Args('id') id: string) {
        return this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: LessonInput) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLesson') assignStudentsToLesson: AssignStudentsToLesson) {
        const { lessonId, studentsIds } = assignStudentsToLesson
        return this.lessonService.assignStudentsToLesson(lessonId, studentsIds)
    }
}