import { DutyModel } from '../../src/models/dutyModel';
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { Duty } from '../../src/interfaces/dutyIneterface';
import { DutyService } from '../../src/services/dutyService';

describe('Duty Service', () => {
    let dutyModel: DutyModel;
    let dutyService: DutyService;

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
        jest.spyOn(dutyModel, 'createDuty').mockImplementation((duty: Duty) => Promise.resolve(mockDuty));
        jest.spyOn(dutyModel, 'getAllDuties').mockImplementation(() => Promise.resolve([mockDuty]));
        jest.spyOn(dutyModel, 'getDutyById').mockImplementation((id: number) => Promise.resolve(mockDuty));
        jest.spyOn(dutyModel, 'updateDuty').mockImplementation((id: number, duty: Duty) => Promise.resolve(updatedDuty));
        jest.spyOn(dutyModel, 'deleteDuty').mockImplementation((id: number) => Promise.resolve(1));
    });

    test('should create a duty', async () => {
        const result = await dutyService.createDuty(mockDuty);
        expect(result).toEqual(mockDuty);
    });

    test('should get all duties', async () => {
        const result = await dutyService.getAllDuties();
        expect(result).toEqual([mockDuty]);
    });

    test('should get duty by id', async () => {
        const result = await dutyService.getDutyById(1);
        expect(result).toEqual(mockDuty);
    });

    test('should update a duty', async () => {
        const result = await dutyService.updateDuty(1, updatedDuty);
        expect(result).toEqual(updatedDuty);
    });

    test('should delete a duty', async () => {
        // deleteDuty returns the number of rows deleted
        const result = await dutyService.deleteDuty(1);
        expect(result).toEqual(1);
        expect(dutyModel.deleteDuty).toHaveBeenCalledWith(1);
    });
});