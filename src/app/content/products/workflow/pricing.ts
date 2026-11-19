// TODO: real pricing — placeholder tiers with no prices.
import {
  placeholderComparison,
  placeholderPlans,
  placeholderPricingFaq,
  placeholderPricingLead,
} from '../../placeholders';
import type { Pricing } from '../../types';

export const pricing: Pricing = {
  lead: placeholderPricingLead({ en: 'Yaquoti Workflow', ar: 'ياقوتي Workflow' }),
  plans: placeholderPlans,
  comparison: placeholderComparison,
  faq: placeholderPricingFaq,
};
