import { DutyModel } from '../../src/models/dutyModel';
import { Duty } from '../../src/interfaces/dutyIneterface';
import { jest, describe, test, expect, beforeEach } from '@jest/globals';

describe('Duty Model', () => {
    const dutyModel = new DutyModel();
    let createDutyId: number;
    const mockDuty: Duty = {
        name: 'Test Duty',
        title: 'Test Title',
        description: 'This is a test duty',
        status: '1',
    };

    test('should create a duty', async () => {
        const result = await dutyModel.createDuty(mockDuty);
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: mockDuty.name,
            title: mockDuty.title,
            description: mockDuty.description,
            status: mockDuty.status,
            created_at: expect.any(Date),
        }));

        if (result?.id) {
            createDutyId = result.id;
        }
    });

    test('should get all duties', async () => {
        const result = await dutyModel.getAllDuties();
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    status: expect.any(String),
                    created_at: expect.any(Date),
                }),
            ]));
    });

    test('should get duty by id', async () => {
        const result = await dutyModel.getDutyById(createDutyId);
        expect(result).toEqual(expect.objectContaining({
            id: createDutyId,
            name: mockDuty.name,
            title: mockDuty.title,
            description: mockDuty.description,
            status: mockDuty.status,
            created_at: expect.any(Date),
        }));
    });

    test('should update a duty', async () => {
        const updatedDuty = { ...mockDuty, name: 'Updated Duty' };
        const result = await dutyModel.updateDuty(createDutyId, updatedDuty);
        expect(result).toEqual(expect.objectContaining({
            id: createDutyId,
            name: updatedDuty.name,
            title: updatedDuty.title,
            description: updatedDuty.description,
            status: updatedDuty.status,
            created_at: expect.any(Date),
        }));
    });

    test('should delete a duty', async () => {
        await dutyModel.deleteDuty(createDutyId);
        const result = await dutyModel.getDutyById(createDutyId);
        expect(result).toBeUndefined();
    });
});