import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Students } from "../../entities/Students";
import { CreateStudentRequestProps } from "../../useCases/createStudents/CreateStudentsController";
import { UpdateStudentRequestProps } from "../../useCases/updateStudents/UpdateStudentController";
import { IStudentsRepository } from "../IStudentsRepository";


class StudentsRepository implements IStudentsRepository {

    private students: Students[]
    constructor() {
        this.students = [];
    }

    async filterStudent(
        id: Students["id"],
        email: Students["email"],
        state: Students["state"],
        paymentStatus: Students["paymentStatus"],
        actualPage: number
    ): Promise<Students[] | validationResponse> {

        if (actualPage == 0) { actualPage = 1 }

        // Função do prisma para buscar todos os students

        try {

            const students = await prisma.students.findMany({
                where: {
                    AND: [
                        { id: id },
                        { email: email },
                        { state: state },
                        { paymentStatus: paymentStatus },
                    ],
                },
            })

            return students
        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async createStudent(studentData: CreateStudentRequestProps): Promise<Students | validationResponse> {

        try {
            const searchedStudent = await prisma.students.findMany({
                where: { email: studentData.email },
            })

            if (searchedStudent[0].email == studentData.email) {
                return { isValid: false, errorMessage: `🛑 E-mail already exists 🛑`, statusCode: 403 }
            }

            const createdStudent = await prisma.students.create({
                data: {
                    name: studentData.name,
                    email: studentData.email,
                    gender: studentData.gender ?? 'Não informado',
                    birth: studentData.birth,
                    phoneNumber: studentData.phoneNumber,
                    country: studentData.country,
                    state: studentData.state,
                    city: studentData.city,

                    address: studentData.address,
                    cpf: studentData.cpf,
                    rg: studentData.rg,
                    selfDeclaration: studentData.selfDeclaration,
                    oldSchool: studentData.oldSchool,
                    oldSchoolAdress: studentData.oldSchoolAdress,
                    highSchoolGraduationDate: studentData.highSchoolGraduationDate,
                    highSchoolPeriod: studentData.highSchoolPeriod,
                    metUsMethod: studentData.metUsMethod,
                    exStudent: studentData.exStudent,

                    valuePaid: studentData.valuePaid,
                    paymentMethod: 'Sem informação ainda',
                    paymentStatus: 'Sem informação ainda',
                    paymentDate: 'Sem informação ainda',
                }
            })

            return createdStudent
        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientValidationError) {

                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async updateStudent(studentData: UpdateStudentRequestProps, studentID: Students["id"]): Promise<Students | validationResponse> {
        try {

            const student = await prisma.students.findUnique({
                where: {
                    id: studentID
                }
            })

            if (student == null) {
                return { isValid: false, errorMessage: '🛑 Student not found 🛑', statusCode: 403 }
            }

            const updatedStudent = await prisma.students.update({
                where: {
                    id: studentID
                },
                data: {
                    name: studentData.name ?? student.name,
                    email: studentData.email ?? student.email,
                    gender: studentData.gender ?? student.gender,
                    birth: studentData.birth ?? student.birth,
                    phoneNumber: studentData.phoneNumber ?? student.phoneNumber,
                    country: studentData.country ?? student.country,
                    state: studentData.state ?? student.state,
                    city: studentData.city ?? student.city,

                    address: studentData.address ?? student.address,
                    cpf: studentData.cpf ?? student.cpf,
                    rg: studentData.rg ?? student.rg,
                    selfDeclaration: studentData.selfDeclaration ?? student.selfDeclaration,
                    oldSchool: studentData.oldSchool ?? student.oldSchool,
                    oldSchoolAdress: studentData.oldSchoolAdress ?? student.oldSchoolAdress,
                    highSchoolGraduationDate: studentData.highSchoolGraduationDate ?? student.highSchoolGraduationDate,
                    highSchoolPeriod: studentData.highSchoolPeriod ?? student.highSchoolPeriod,
                    metUsMethod: studentData.metUsMethod ?? student.metUsMethod,
                    exStudent: studentData.exStudent ?? student.exStudent,

                    valuePaid: studentData.valuePaid ?? student.valuePaid,
                    paymentMethod: studentData.paymentMethod ?? student.paymentMethod,
                    paymentStatus: studentData.paymentStatus ?? student.paymentStatus,
                    paymentDate: studentData.paymentDate ?? student.paymentDate,
                }
            })
            return updatedStudent

        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientValidationError) {
                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }
            }

            else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async deleteStudent(studentID: string): Promise<Students | validationResponse> {
        try {

            const student = await prisma.students.findUnique({
                where: {
                    id: studentID
                }
            })


            if (student != null) {

                try {

                    await prisma.students.delete({
                        where: {
                            id: studentID
                        }
                    })

                    return student

                } catch {

                    return {
                        isValid: false,
                        statusCode: 403,
                        errorMessage: "⛔ An error occurred when trying to delete the student from the database ⛔"
                    }
                }

            } else {

                return {
                    isValid: false,
                    statusCode: 403,
                    errorMessage: "⛔ Donation not found in database ⛔"
                }
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

}

export { StudentsRepository }
