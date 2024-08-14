export interface Food {
  name: string;
  id: number;
  image: string | null;
}

export class Allergy {
  constructor(
    public name: string,
    public severity: string,
    public foods: Food[],
  ) {}

  private static severityRankDict: { [key: string]: number } = {
    "1. Anaphylaxis": 1,
    "2. Severe": 2,
    "3. Medium": 3,
    "4. Mild": 4,
    "5. Low": 5,
    "6. Very Low": 6,
    "7. No Reaction": 7,
  };

  public static fromObj: (obj: {
    name: string;
    severity: string;
    foods: Food[];
  }) => Allergy = (obj) => {
    return new Allergy(obj.name, obj.severity, obj.foods);
  };

  public severityRank = () => Allergy.severityRankDict[this.severity] || 7;
}

// export interface Allergy {
//   name: string;
//   severity: string;
//   foods: Food[];
// }

export interface AllergyList {
  person: string;
  allergies: Allergy[];
}
