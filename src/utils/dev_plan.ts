import { DevPlanQuistions } from "config";

export const DevPlanQuistion = (value: string) => {
  console.log((value = DevPlanQuistions.TreatInteract), "value");
  switch (value) {
    case DevPlanQuistions.TreatInteract:
      return "Танд бусад хүмүүс хэрхэн хандаж, харилцаасай гэж хүсдэг вэ?";
    case DevPlanQuistions.LifePride:
      return "Таны амьдралын бахархал юу вэ?";
    case DevPlanQuistions.LifeValue:
      return "Одоо таны амьдралын үнэт зүйл  юу вэ?";
    case DevPlanQuistions.PriorityService:
      return "Танд нэн тэргүүнд шаардлагатай ямар тусламж үйлчилгээ байна вэ?";
  }
};
