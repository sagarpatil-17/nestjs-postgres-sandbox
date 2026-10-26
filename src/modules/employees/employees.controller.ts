import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './entities/employees.entitiy';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post('create')
    async createEmployee(@Body() body: Partial<Employees>): Promise<Employees> {
        return this.employeesService.createEmployee(body)
    }

    @Get('all')
    async getAllEmployees() {
        return this.employeesService.getAllEmployees();
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: string) {
        return this.employeesService.getEmployeeById(Number(id));
    }

    @Patch('update/:id')
    async updateEmployee(@Param('id') id: string, @Body() employeeData: Partial<Employees>) {
        return this.employeesService.updateEmployee(Number(id), employeeData);
    }

    @Delete('delete/:id')
    async deleteEmployee(@Param('id') id: string) {
        return this.employeesService.deleteEmployee(Number(id))
    }
}
