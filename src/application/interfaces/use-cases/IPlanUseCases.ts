import { PremiumPlan } from '@/domain/entities/PremiumPlan';

export interface IEditPlanUseCase {

    execute(id: string, update: Partial<PremiumPlan>): Promise<PremiumPlan | null>

}
