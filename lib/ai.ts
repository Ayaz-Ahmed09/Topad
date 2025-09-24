import { EvaluationService } from './evaluation-service';

export async function evaluateAdCreativity(adData: any, userEmail: string = 'anonymous@test.com', userName: string = 'Anonymous User') {
  const isOwner = userEmail === 'teams@topad.site'; // Your actual email
  return await EvaluationService.evaluateAd(adData, userEmail, userName, isOwner);
}