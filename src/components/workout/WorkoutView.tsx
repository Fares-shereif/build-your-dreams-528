import { Play, Dumbbell, Bike, Timer, Trophy, ChevronLeft, Plus, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

const workoutTypes = [
  { id: 'strength', icon: Dumbbell, label: 'تمارين القوة', color: 'primary' },
  { id: 'cardio', icon: Bike, label: 'كارديو', color: 'accent' },
  { id: 'recovery', icon: Timer, label: 'تمديد وتعافي', color: 'warning' },
];

const exercises = {
  strength: [
    { name: 'Bench Press', arabicName: 'بنش برس', sets: 4, reps: 8, weight: 60 },
    { name: 'Incline Dumbbell Press', arabicName: 'بنش مائل دمبل', sets: 3, reps: 10, weight: 22 },
    { name: 'Cable Fly', arabicName: 'كيبل فلاي', sets: 3, reps: 12, weight: 15 },
    { name: 'Tricep Pushdown', arabicName: 'تراي بوش داون', sets: 3, reps: 12, weight: 25 },
  ],
};

const WorkoutView = () => {
  const [selectedType, setSelectedType] = useState('strength');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});

  const todayStats = {
    duration: 45,
    volume: 4580,
    exercises: 6,
    calories: 320,
  };

  const toggleSet = (exerciseName: string, setIndex: number) => {
    setCompletedSets(prev => {
      const current = prev[exerciseName] || [];
      if (current.includes(setIndex)) {
        return { ...prev, [exerciseName]: current.filter(s => s !== setIndex) };
      }
      return { ...prev, [exerciseName]: [...current, setIndex] };
    });
  };

  return (
    <div className="pb-24 animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-1">التمارين</h1>
          <p className="text-muted-foreground">سجّل تمارينك اليومية</p>
        </div>
        <div className="flex items-center gap-2 bg-success/20 rounded-full px-3 py-1.5">
          <Trophy className="w-4 h-4 text-success" />
          <span className="text-sm font-semibold text-success">PR جديد!</span>
        </div>
      </div>

      {/* Start Workout Button */}
      {!isWorkoutActive && (
        <Button
          onClick={() => setIsWorkoutActive(true)}
          className="w-full h-16 text-lg font-display font-bold mb-6 bg-gradient-primary hover:opacity-90 shadow-button transition-all"
        >
          <Play className="w-6 h-6 ml-2" />
          ابدأ التمرين
        </Button>
      )}

      {/* Workout Types */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {workoutTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-secondary border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'المدة', value: `${todayStats.duration} دقيقة`, icon: Timer },
          { label: 'الحجم الكلي', value: `${todayStats.volume.toLocaleString()} كجم`, icon: Dumbbell },
          { label: 'التمارين', value: todayStats.exercises, icon: ChevronLeft },
          { label: 'السعرات', value: todayStats.calories, icon: Play },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-gradient-card rounded-xl p-4 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Exercises List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-semibold text-foreground">تمارين اليوم</h2>
          <Button size="sm" variant="ghost" className="text-primary">
            <Plus className="w-4 h-4 ml-1" />
            إضافة تمرين
          </Button>
        </div>
        
        <div className="space-y-4">
          {exercises.strength.map((exercise, idx) => {
            const completed = completedSets[exercise.name] || [];
            return (
              <div
                key={idx}
                className="bg-gradient-card rounded-xl p-4 border border-border/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-medium text-foreground">{exercise.arabicName}</p>
                    <p className="text-xs text-muted-foreground">{exercise.name}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-primary font-semibold">
                      {exercise.sets} × {exercise.reps}
                    </p>
                    <p className="text-xs text-muted-foreground">{exercise.weight} كجم</p>
                  </div>
                </div>
                
                {/* Sets */}
                <div className="flex gap-2">
                  {Array.from({ length: exercise.sets }).map((_, setIdx) => (
                    <button
                      key={setIdx}
                      onClick={() => toggleSet(exercise.name, setIdx)}
                      className={`flex-1 h-10 rounded-lg border transition-all flex items-center justify-center ${
                        completed.includes(setIdx)
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-secondary border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {completed.includes(setIdx) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{setIdx + 1}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutView;
