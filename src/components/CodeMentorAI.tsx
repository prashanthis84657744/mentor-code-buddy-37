import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Exercise {
  title: string;
  description: string;
  template: string;
  example: string;
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface TutorialStep {
  title: string;
  content: string;
  code: string;
}

const CodeMentorAI = () => {
  const [analyzeCode, setAnalyzeCode] = useState('');
  const [debugCode, setDebugCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [debugResult, setDebugResult] = useState('');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialProgress, setTutorialProgress] = useState(0);

  const exercises: Record<string, Exercise[]> = {
    beginner: [
      {
        title: "Find Maximum Number",
        description: "Write a function that finds the largest number in an array.",
        template: "function findMax(numbers) {\n    // Your code here\n}",
        example: "findMax([3, 7, 2, 9, 1]) should return 9",
        solution: "function findMax(numbers) {\n    return Math.max(...numbers);\n}",
        difficulty: 'beginner'
      },
      {
        title: "Count Vowels",
        description: "Create a function that counts vowels in a string.",
        template: "function countVowels(str) {\n    // Your code here\n}",
        example: "countVowels('hello') should return 2",
        solution: "function countVowels(str) {\n    const vowels = 'aeiouAEIOU';\n    return str.split('').filter(char => vowels.includes(char)).length;\n}",
        difficulty: 'beginner'
      }
    ],
    intermediate: [
      {
        title: "Palindrome Checker",
        description: "Write a function that checks if a string is a palindrome.",
        template: "function isPalindrome(str) {\n    // Your code here\n}",
        example: "isPalindrome('racecar') should return true",
        solution: "function isPalindrome(str) {\n    const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');\n    return cleaned === cleaned.split('').reverse().join('');\n}",
        difficulty: 'intermediate'
      }
    ],
    advanced: [
      {
        title: "Binary Search Implementation",
        description: "Implement binary search algorithm for a sorted array.",
        template: "function binarySearch(arr, target) {\n    // Your code here\n}",
        example: "binarySearch([1, 3, 5, 7, 9], 5) should return 2 (index)",
        solution: "function binarySearch(arr, target) {\n    let left = 0, right = arr.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}",
        difficulty: 'advanced'
      }
    ]
  };

  const tutorials: Record<string, TutorialStep[]> = {
    variables: [
      {
        title: "What are Variables?",
        content: "Variables are containers that store data values. In JavaScript, you can declare variables using let, const, or var.",
        code: "let message = 'Hello World';\nconst pi = 3.14159;\nvar count = 0;"
      },
      {
        title: "Data Types",
        content: "JavaScript has several data types: strings, numbers, booleans, arrays, objects, and more.",
        code: "let name = 'Alice';        // String\nlet age = 25;            // Number\nlet isStudent = true;    // Boolean\nlet hobbies = ['reading', 'coding']; // Array"
      }
    ],
    functions: [
      {
        title: "Function Basics",
        content: "Functions are reusable blocks of code that perform specific tasks.",
        code: "function greet(name) {\n    return 'Hello, ' + name + '!';\n}\n\nconst message = greet('Alice');"
      }
    ]
  };

  const analyzeCodeFunction = () => {
    if (!analyzeCode.trim()) {
      setAnalysisResult('Please enter some code to analyze.');
      return;
    }

    const lines = analyzeCode.split('\n').length;
    const functions = (analyzeCode.match(/function\s+\w+/g) || []).length;
    const variables = (analyzeCode.match(/(?:let|const|var)\s+\w+/g) || []).length;

    let analysis = `📊 Code Analysis Report\n\nCode Metrics:\n• Lines of code: ${lines}\n• Functions defined: ${functions}\n• Variables declared: ${variables}\n\n`;

    if (analyzeCode.includes('fibonacci')) {
      analysis += `💡 Algorithm Analysis:\nThis is a recursive Fibonacci implementation with O(2^n) time complexity. Consider using dynamic programming for better performance.\n\n`;
    }

    analysis += `🎯 Best Practices:\n• Use meaningful variable names\n• Add proper error handling\n• Consider edge cases\n• Optimize for readability`;

    setAnalysisResult(analysis);
  };

  const debugCodeFunction = () => {
    if (!debugCode.trim()) {
      setDebugResult('Please enter some code to debug.');
      return;
    }

    let debugReport = '🐛 Bug Detection Report\n\n';

    if (debugCode.includes('i <= numbers.length')) {
      debugReport += `🚨 Array Index Error Detected:\n\nIssue: Loop condition 'i <= numbers.length' will cause array out-of-bounds error.\nProblem: Arrays are zero-indexed, so valid indices are 0 to length-1.\nFix: Change to 'i < numbers.length'\n\n`;
      
      debugReport += `✅ Corrected Code:\nfunction calculateAverage(numbers) {\n    let sum = 0;\n    for (let i = 0; i < numbers.length; i++) {\n        sum += numbers[i];\n    }\n    return sum / numbers.length;\n}`;
    } else {
      debugReport += `🔍 Debugging Tips:\n• Use console.log() to trace values\n• Check array bounds and null values\n• Verify function parameters\n• Test with different inputs`;
    }

    setDebugResult(debugReport);
  };

  const generateExercise = (level: string) => {
    const exerciseList = exercises[level];
    if (exerciseList) {
      const randomExercise = exerciseList[Math.floor(Math.random() * exerciseList.length)];
      setCurrentExercise(randomExercise);
      setShowSolution(false);
    }
  };

  const startTutorial = (topic: string) => {
    const tutorialSteps = tutorials[topic];
    if (tutorialSteps) {
      setCurrentTutorial(tutorialSteps);
      setCurrentStep(0);
      setTutorialProgress(0);
    }
  };

  const nextStep = () => {
    if (currentStep < currentTutorial.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setTutorialProgress(((newStep + 1) / currentTutorial.length) * 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      setTutorialProgress(((newStep + 1) / currentTutorial.length) * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container max-w-7xl mx-auto p-5">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">🤖 CodeMentor AI</h1>
          <p className="text-lg md:text-xl opacity-90">Your Intelligent Programming Learning & Debugging Assistant</p>
        </div>

        {/* Main Panel */}
        <Card className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <Tabs defaultValue="analyzer" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="analyzer">Code Analyzer</TabsTrigger>
              <TabsTrigger value="debugger">Smart Debugger</TabsTrigger>
              <TabsTrigger value="exercises">Practice Exercises</TabsTrigger>
              <TabsTrigger value="tutorials">Interactive Tutorials</TabsTrigger>
            </TabsList>

            {/* Code Analyzer Tab */}
            <TabsContent value="analyzer" className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Code Analysis & Explanation</h2>
                  <p className="text-muted-foreground">Paste your code below to get detailed analysis, explanations, and improvement suggestions.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Code</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={analyzeCode}
                        onChange={(e) => setAnalyzeCode(e.target.value)}
                        placeholder="// Paste your code here
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));"
                        className="min-h-[300px] font-mono"
                      />
                      <Button onClick={analyzeCodeFunction} className="w-full bg-gradient-primary text-white">
                        Analyze Code
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="min-h-[300px] p-4 bg-muted rounded-lg">
                        {analysisResult ? (
                          <pre className="whitespace-pre-wrap text-sm">{analysisResult}</pre>
                        ) : (
                          <p className="text-muted-foreground">Click "Analyze Code" to see detailed analysis...</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Smart Debugger Tab */}
            <TabsContent value="debugger" className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Smart Debugging Assistant</h2>
                  <p className="text-muted-foreground">Submit code with errors and get intelligent debugging suggestions.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Code to Debug</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={debugCode}
                        onChange={(e) => setDebugCode(e.target.value)}
                        placeholder="// Paste your buggy code here
function calculateAverage(numbers) {
    let sum = 0;
    for (let i = 0; i <= numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5]));"
                        className="min-h-[300px] font-mono"
                      />
                      <div className="flex gap-2">
                        <Button onClick={debugCodeFunction} className="flex-1 bg-gradient-primary text-white">
                          Find & Fix Bugs
                        </Button>
                        <Button variant="secondary" onClick={debugCodeFunction} className="flex-1 bg-gradient-success text-white">
                          Explain Errors
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Debugging Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="min-h-[300px] p-4 bg-muted rounded-lg">
                        {debugResult ? (
                          <pre className="whitespace-pre-wrap text-sm">{debugResult}</pre>
                        ) : (
                          <p className="text-muted-foreground">Submit your code for intelligent debugging analysis...</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Practice Exercises Tab */}
            <TabsContent value="exercises" className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Programming Practice Exercises</h2>
                  <p className="text-muted-foreground">Challenge yourself with exercises tailored to your skill level.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button onClick={() => generateExercise('beginner')} variant="outline">
                    Beginner
                  </Button>
                  <Button onClick={() => generateExercise('intermediate')} variant="outline">
                    Intermediate
                  </Button>
                  <Button onClick={() => generateExercise('advanced')} variant="outline">
                    Advanced
                  </Button>
                </div>
                
                {currentExercise ? (
                  <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{currentExercise.title}</CardTitle>
                        <Badge variant={currentExercise.difficulty === 'beginner' ? 'secondary' : currentExercise.difficulty === 'intermediate' ? 'default' : 'destructive'}>
                          {currentExercise.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{currentExercise.description}</p>
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm">{currentExercise.template}</pre>
                      </div>
                      <p><strong>Example:</strong> {currentExercise.example}</p>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowSolution(!showSolution)}
                          variant="outline"
                        >
                          {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </Button>
                        <Button onClick={() => generateExercise(currentExercise.difficulty)}>
                          New {currentExercise.difficulty} Exercise
                        </Button>
                      </div>
                      {showSolution && (
                        <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                          <strong className="text-success">Solution:</strong>
                          <pre className="text-sm mt-2">{currentExercise.solution}</pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">Select a difficulty level above to get started with practice exercises!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Interactive Tutorials Tab */}
            <TabsContent value="tutorials" className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Interactive Programming Tutorials</h2>
                  <p className="text-muted-foreground">Step-by-step guidance through programming concepts.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button onClick={() => startTutorial('variables')} variant="outline">
                    Variables & Data Types
                  </Button>
                  <Button onClick={() => startTutorial('functions')} variant="outline">
                    Functions
                  </Button>
                </div>

                {currentTutorial.length > 0 && (
                  <div className="space-y-4">
                    <Progress value={tutorialProgress} className="w-full" />
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {currentStep + 1}
                          </div>
                          <CardTitle>{currentTutorial[currentStep]?.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{currentTutorial[currentStep]?.content}</p>
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="text-sm">{currentTutorial[currentStep]?.code}</pre>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={prevStep} 
                            disabled={currentStep === 0}
                            variant="outline"
                          >
                            Previous
                          </Button>
                          <Button 
                            onClick={nextStep}
                            disabled={currentStep === currentTutorial.length - 1}
                          >
                            Next Step
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentTutorial.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <h3 className="text-lg font-semibold mb-4">Welcome to Interactive Learning!</h3>
                      <p className="text-muted-foreground mb-4">
                        Select a tutorial topic above to begin your guided programming journey. Each tutorial includes:
                      </p>
                      <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
                        <li>• Step-by-step explanations</li>
                        <li>• Interactive code examples</li>
                        <li>• Practice exercises</li>
                        <li>• Progress tracking</li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CodeMentorAI;