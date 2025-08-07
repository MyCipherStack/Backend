import { IpremiumPlanRepository } from '@/domain/repositories/IPremiumPlanRepositroy';
import { PremiumPlan } from '@/domain/entities/PremiumPlan';
import { IEditPlanUseCase } from '@/application/interfaces/use-cases/IPlanUseCases';

export class EditPlanUseCase implements IEditPlanUseCase {
  constructor(
        private premiumPlanRepository:IpremiumPlanRepository,
  ) { }

  async execute(id: string, update: Partial<PremiumPlan>): Promise<PremiumPlan | null> {
    const data = await this.premiumPlanRepository.updateOneById(id, update);

    return data ?? null;
  }
}
