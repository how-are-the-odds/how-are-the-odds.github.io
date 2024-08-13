export interface Food {
  name: string;
  id: number;
  image: string | null;
}

export interface Allergy {
  name: string;
  severity: string;
  foods: Food[];
}

export interface AllergyList {
  person: string;
  allergies: Allergy[];
}
