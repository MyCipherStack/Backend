import { IpremiumPlanRepository } from '@/domain/repositories/IPremiumPlanRepositroy.js';
import { PremiumPlan } from '@/domain/entities/PremiumPlan.js';
import { IEditPlanUseCase } from '@/application/interfaces/use-cases/IPlanUseCases.js';

export class EditPlanUseCase implements IEditPlanUseCase {
  constructor(
        private premiumPlanRepository:IpremiumPlanRepository,
  ) { }

  async execute(id: string, update: Partial<PremiumPlan>): Promise<PremiumPlan | null> {
    const data = await this.premiumPlanRepository.updateOneById(id, update);

    return data ?? null;
  }
}
