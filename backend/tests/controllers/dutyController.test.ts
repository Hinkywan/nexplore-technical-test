import { NextFunction, Request, Response } from "express";
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { Duty } from '../../src/interfaces/dutyIneterface';
import { DutyModel } from '../../src/models/dutyModel';
import { DutyService } from '../../src/services/dutyService';
import { DutyController } from '../../src/controllers/dutyController';

// jest.mock('../../src/services/dutyService');

describe('Duty Controller', () => {
    let dutyModel: DutyModel;
    let dutyService: DutyService;
    let dutyController: DutyController;

    let request: Request;
    let response: Response;
    let next: NextFunction;
    const mockDuty: Duty = {
        name: 'Test Duty',
        title: 'Test Title',
        description: 'This is a test duty',
        status: '1',
    };
    const updatedDuty = { ...mockDuty, name: 'Updated Duty' };

    beforeEach(() => {
        dutyModel = new DutyModel();
        dutyService = new DutyService(dutyModel);
        dutyController = new DutyController(dutyService);

        request = {
            body: mockDuty,
        } as Request;

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        next = jest.fn();

        jest.spyOn(dutyService, 'createDuty').mockImplementation((duty: Duty) => Promise.resolve(mockDuty));
        jest.spyOn(dutyService, 'getAllDuties').mockImplementation(() => Promise.resolve([mockDuty]));
        jest.spyOn(dutyService, 'getDutyById').mockImplementation((id: number) => Promise.resolve(mockDuty));
        jest.spyOn(dutyService, 'updateDuty').mockImplementation((id: number, duty: Duty) => Promise.resolve(updatedDuty));
        jest.spyOn(dutyService, 'deleteDuty').mockImplementation((id: number) => Promise.resolve(1));
    });

    test('should create a duty and return 201 status on success', async () => {
        await dutyController.createDuty(request, response, next);
        expect(dutyService.createDuty).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({
            data: mockDuty,
            status: 'success'
        });
    });

    test('should get all duties and return 200 status on success', async () => {
        await dutyController.getAllDuties(request, response, next);
        expect(dutyService.getAllDuties).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            data: [mockDuty],
            status: 'success'
        });
    });

    test('should get duty by id and return 200 status on success', async () => {
        const id = 1;
        request.params = { id: id.toString() };
        await dutyController.getDutyById(request, response, next);
        expect(dutyService.getDutyById).toHaveBeenCalledWith(id);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            data: mockDuty,
            status: 'success'
        });
    });

    test('should update a duty and return 200 status on success', async () => {
        const id = 1;
        request.params = { id: id.toString() };
        await dutyController.updateDuty(request, response, next);
        expect(dutyService.updateDuty).toHaveBeenCalledWith(id, mockDuty);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
            data: updatedDuty,
            status: 'success'
        });
    });

    test('should delete a duty and return 200 status on success', async () => {
        const id = 1;
        request.params = { id: id.toString() };
        await dutyController.deleteDuty(request, response, next);
        expect(dutyService.deleteDuty).toHaveBeenCalledWith(id);
        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.json).not.toHaveBeenCalled();
    });
});