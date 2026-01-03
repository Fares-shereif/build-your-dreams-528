import { Plus, Search, Camera, Clock, Coffee, Sun, Moon, Dumbbell, Apple } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

const mealTypes = [
  { id: 'breakfast', icon: Coffee, label: 'الإفطار', time: '7:00 - 10:00' },
  { id: 'lunch', icon: Sun, label: 'الغداء', time: '12:00 - 15:00' },
  { id: 'dinner', icon: Moon, label: 'العشاء', time: '18:00 - 21:00' },
  { id: 'snack', icon: Apple, label: 'وجبة خفيفة', time: 'أي وقت' },
  { id: 'pre-workout', icon: Dumbbell, label: 'قبل التمرين', time: '30-60 دقيقة قبل' },
  { id: 'post-workout', icon: Dumbbell, label: 'بعد التمرين', time: '30-60 دقيقة بعد' },
];

const recentFoods = [
  { name: 'صدر دجاج مشوي', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'أرز أبيض', calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
  { name: 'بيض مسلوق (2)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'شوفان', calories: 150, protein: 5, carbs: 27, fat: 2.5 },
];

const NutritionView = () => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const todayMeals = [
    {
      type: 'breakfast',
      foods: [
        { name: 'شوفان مع موز', calories: 280, protein: 8, carbs: 52, fat: 5 },
        { name: 'بيض مسلوق', calories: 78, protein: 6, carbs: 0.5, fat: 5 },
      ],
    },
    {
      type: 'lunch',
      foods: [
        { name: 'صدر دجاج مع أرز', calories: 450, protein: 40, carbs: 45, fat: 8 },
      ],
    },
  ];

  const getMealInfo = (mealId: string) => {
    return mealTypes.find(m => m.id === mealId);
  };

  const calculateMealTotal = (foods: typeof recentFoods) => {
    return foods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <div className="pb-24 animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">التغذية</h1>
        <p className="text-muted-foreground">سجّل وجباتك اليومية</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="ابحث عن طعام..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 bg-secondary border-border"
        />
        <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2">
          <Camera className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Add Meal Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {mealTypes.slice(0, 6).map((meal) => {
          const Icon = meal.icon;
          return (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                selectedMeal === meal.id
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-secondary border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{meal.label}</span>
            </button>
          );
        })}
      </div>

      {/* Today's Meals */}
      <div className="mb-6">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          وجبات اليوم
        </h2>
        <div className="space-y-4">
          {todayMeals.map((meal) => {
            const mealInfo = getMealInfo(meal.type);
            const totals = calculateMealTotal(meal.foods);
            if (!mealInfo) return null;
            const Icon = mealInfo.icon;

            return (
              <div
                key={meal.type}
                className="bg-gradient-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{mealInfo.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {totals.calories} سعرة
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {meal.foods.map((food, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-t border-border/50"
                    >
                      <span className="text-sm text-foreground">{food.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {food.calories} سعرة
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Foods */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-4">الأطعمة الأخيرة</h2>
        <div className="space-y-2">
          {recentFoods.map((food, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 bg-secondary rounded-xl border border-border hover:border-primary/50 transition-all"
            >
              <div className="text-right">
                <p className="font-medium text-foreground">{food.name}</p>
                <p className="text-xs text-muted-foreground">
                  ب {food.protein}g • ك {food.carbs}g • د {food.fat}g
                </p>
              </div>
              <div className="text-left">
                <p className="font-semibold text-primary">{food.calories}</p>
                <p className="text-xs text-muted-foreground">سعرة</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionView;
