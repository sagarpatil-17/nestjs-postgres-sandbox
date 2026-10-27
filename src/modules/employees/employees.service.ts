import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './entities/employees.entitiy';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees) private employeesRepository: Repository<Employees>
    ) { }

    async createEmployee(employeeData: Partial<Employees>): Promise<Employees> {
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }

    async getAllEmployees(): Promise<Employees[]> {
        return await this.employeesRepository.find();
    }

    async getEmployeeById(id: number): Promise<Employees> {
        const employee = await this.employeesRepository.findOne({ where: { id: id } });

        if (!employee) {
            throw new NotFoundException('Employee with ID ${id} not found')
        }

        return employee;
    }

    async updateEmployee(id: number, employeeData: Partial<Employees>): Promise<Employees> {
        const updateResult = await this.employeesRepository.update(id, employeeData);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const updatedEmployee = await this.employeesRepository.findOne({ where: { id } });

        return updatedEmployee!;
    }

    async deleteEmployee(id: number): Promise<DeleteResult> {
        return this.employeesRepository.delete(id);
    }

    async filterEmployees(filters: { name?: string, department?: string }): Promise<Employees[]> {
        const query = this.employeesRepository.createQueryBuilder('employees');

        query.where('1 = 1');

        if (filters.name) {
            query.andWhere('employees.name ILIKE :name', {
                name: `%${filters.name}%`
            })
        }

        if (filters.department) {
            query.andWhere('employees.department ILIKE :department', {
                department: `%${filters.department}%`
            })
        }

        return query.getMany();
    }

}
