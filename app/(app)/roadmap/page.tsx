'use client';

import { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  Node,
  Edge,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Connection,
} from 'reactflow';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import 'reactflow/dist/style.css';

type Step = 'topic' | 'questions' | 'roadmap';

interface State {
  currentStep: Step;
  userTopic: string;
  questionResponses: Record<number, string>;
}

// Custom Node Component
const CustomNode = ({ data }: { data: { label: string; description: string; isFinal?: boolean } }) => (
  <div className={`
    backdrop-blur-sm rounded-xl p-5 relative
    transition-all duration-300 transform hover:scale-105
    border border-opacity-20
    ${data.isFinal 
      ? 'bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 text-white border-white/20 shadow-lg shadow-emerald-500/20' 
      : 'bg-white/80 hover:bg-white/90 border-emerald-100/30 shadow-lg shadow-black/5'}
    min-w-[200px] cursor-pointer
  `}>
    <Handle
      type="target"
      position={Position.Top}
      className="w-3 h-3 !bg-emerald-500 border-2 border-white rounded-full"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="w-3 h-3 !bg-emerald-500 border-2 border-white rounded-full"
    />
    
    <div className="space-y-2">
      <h3 className={`
        font-semibold text-center text-sm
        ${data.isFinal ? 'text-white' : 'text-gray-800'}
      `}>
        {data.label}
      </h3>
      <p className={`
        text-xs leading-relaxed
        ${data.isFinal ? 'text-emerald-50' : 'text-gray-500'}
      `}>
        {data.description}
      </p>
    </div>
  </div>
);

const nodeTypes = {
  custom: CustomNode
};

const TopicInput = ({ 
  onSubmit, 
  userTopic, 
  setUserTopic 
}: { 
  onSubmit: () => void; 
  userTopic: string;
  setUserTopic: (topic: string) => void;
}) => (
  <Card className="max-w-xl mx-auto backdrop-blur-sm bg-white/80 border-emerald-100/20">
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        What would you like to learn?
      </h2>
      <input 
        type="text"
        className="w-full p-4 rounded-xl border border-emerald-100 bg-white/50 backdrop-blur-sm
                 focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                 transition-all duration-200"
        placeholder="Enter a topic (e.g., Machine Learning, Web Development)"
        value={userTopic}
        onChange={(e) => setUserTopic(e.target.value)}
      />
      <Button 
        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600
                   hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200
                   shadow-lg shadow-emerald-500/20"
        onClick={onSubmit}
        disabled={!userTopic.trim()}
      >
        Continue
      </Button>
    </div>
  </Card>
);

const Questions = ({ 
  topic, 
  responses, 
  onAnswer, 
  onComplete 
}: { 
  topic: string;
  responses: Record<number, string>;
  onAnswer: (id: number, answer: string) => void;
  onComplete: () => void;
}) => {
  const questions = questionsData(topic);
  const currentQuestionIndex = Object.keys(responses).length;
  const currentQuestion = questions[currentQuestionIndex];
  const isComplete = currentQuestionIndex === questions.length;

  return (
    <Card className="max-w-xl mx-auto backdrop-blur-sm bg-white/80 border-emerald-100/20">
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Let's personalize your learning path
        </h2>
        
        {!isComplete ? (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">{currentQuestion.question}</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map(option => (
                <Button
                  key={option}
                  variant="outline"
                  onClick={() => onAnswer(currentQuestion.id, option)}
                  className="h-auto py-3 px-4 rounded-xl text-sm hover:bg-emerald-50"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <Button 
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600
                       hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200
                       shadow-lg shadow-emerald-500/20 mt-8"
            onClick={onComplete}
          >
            Generate Roadmap
          </Button>
        )}
        
        {/* Progress indicator */}
        <div className="text-sm text-gray-500 text-center">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </Card>
  );
};

const RoadmapDAG = ({ topic }: { topic: string }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(generateDAGData(topic).nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateDAGData(topic).edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#10b981',
      }
    }, eds)),
    [setEdges]
  );

  return (
    <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-white to-emerald-50">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ custom: CustomNode }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { 
            strokeWidth: 2,
            stroke: '#10b981',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#10b981',
          },
        }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        className="transition-all duration-300"
      >
        <Background 
          color="#34d399"
          gap={16} 
          size={1}
          className="opacity-20"
        />
        <Controls 
          className="backdrop-blur-sm bg-white/50 border border-white/20 rounded-xl p-2"
        />
      </ReactFlow>

      <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-emerald-100/20">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium">💡 Pro tip:</span> Drag between nodes to create connections. Click and drag nodes to rearrange your learning path.
        </p>
      </div>
    </div>
  );
};

const questionsData = (topic: string) => [
  {
    id: 1,
    question: `What's your current experience level with ${topic}?`,
    options: ["Complete Beginner", "Some Knowledge", "Intermediate", "Advanced"]
  },
  {
    id: 2,
    question: "How much time can you dedicate to learning?",
    options: ["1-2 hours/week", "3-5 hours/week", "5-10 hours/week", "10+ hours/week"]
  },
  {
    id: 3,
    question: "What's your preferred learning style?",
    options: ["Visual Learning", "Reading/Writing", "Practical Exercises", "Mixed Approach"]
  },
  {
    id: 4,
    question: "What's your primary goal?",
    options: ["Career Change", "Skill Enhancement", "Personal Project", "Academic Purpose"]
  },
  {
    id: 5,
    question: "Do you have any related experience?",
    options: ["No Experience", "Similar Field", "Some Projects", "Professional Experience"]
  }
];

const generateDAGData = (topic: string) => {
  // Define node positions for a balanced layout
  const nodes: Node[] = [
    // Starting node
    {
      id: 'start',
      type: 'custom',
      position: { x: 400, y: 0 },
      data: {
        label: 'Start Here',
        description: 'Beginning of your learning journey',
        isFinal: false
      }
    },
    // First layer
    {
      id: 'basics',
      type: 'custom',
      position: { x: 200, y: 150 },
      data: {
        label: 'Core Fundamentals',
        description: 'Essential concepts and theory',
        isFinal: false
      }
    },
    {
      id: 'tools',
      type: 'custom',
      position: { x: 600, y: 150 },
      data: {
        label: 'Basic Tools',
        description: 'Foundational tools and practices',
        isFinal: false
      }
    },
    // Second layer
    {
      id: 'practice',
      type: 'custom',
      position: { x: 400, y: 300 },
      data: {
        label: 'Practical Skills',
        description: 'Hands-on implementation',
        isFinal: false
      }
    },
    {
      id: 'advanced-tools',
      type: 'custom',
      position: { x: 800, y: 300 },
      data: {
        label: 'Advanced Tools',
        description: 'Professional-grade tooling',
        isFinal: false
      }
    },
    // Third layer
    {
      id: 'projects',
      type: 'custom',
      position: { x: 200, y: 450 },
      data: {
        label: 'Project Building',
        description: 'Real-world applications',
        isFinal: false
      }
    },
    {
      id: 'best-practices',
      type: 'custom',
      position: { x: 600, y: 450 },
      data: {
        label: 'Best Practices',
        description: 'Industry standards and patterns',
        isFinal: false
      }
    },
    // Final node
    {
      id: 'mastery',
      type: 'custom',
      position: { x: 400, y: 600 },
      data: {
        label: `${topic} Mastery`,
        description: 'Complete proficiency achieved',
        isFinal: true
      }
    },
  ];

  // Define edges with custom styling
  const edges: Edge[] = [
    // Start connections
    { id: 'e-start-basics', source: 'start', target: 'basics' },
    { id: 'e-start-tools', source: 'start', target: 'tools' },
    // First layer connections
    { id: 'e-basics-practice', source: 'basics', target: 'practice' },
    { id: 'e-tools-practice', source: 'tools', target: 'practice' },
    { id: 'e-tools-advanced', source: 'tools', target: 'advanced-tools' },
    // Second layer connections
    { id: 'e-practice-projects', source: 'practice', target: 'projects' },
    { id: 'e-practice-best', source: 'practice', target: 'best-practices' },
    { id: 'e-advanced-best', source: 'advanced-tools', target: 'best-practices' },
    // Final connections
    { id: 'e-projects-mastery', source: 'projects', target: 'mastery' },
    { id: 'e-best-mastery', source: 'best-practices', target: 'mastery' },
  ].map(edge => ({
    ...edge,
    type: 'smoothstep',
    animated: true,
    style: { 
      stroke: '#10b981',
      strokeWidth: 3,
      opacity: 0.8
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#10b981',
    },
  }));

  return { nodes, edges };
};

export default function RoadmapPage() {
  const [state, setState] = useState<State>({
    currentStep: 'topic',
    userTopic: '',
    questionResponses: {}
  });

  const stepProgress = {
    topic: 33,
    questions: 66,
    roadmap: 100
  };

  const handleTopicSubmit = () => {
    setState(prev => ({ ...prev, currentStep: 'questions' }));
  };

  const handleQuestionAnswer = (id: number, answer: string) => {
    setState(prev => ({
      ...prev,
      questionResponses: { ...prev.questionResponses, [id]: answer }
    }));
  };

  const handleQuestionsComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'roadmap' }));
  };

  const renderCurrentStep = () => {
    switch(state.currentStep) {
      case 'topic':
        return (
          <TopicInput 
            onSubmit={handleTopicSubmit}
            userTopic={state.userTopic}
            setUserTopic={(topic) => setState(prev => ({ ...prev, userTopic: topic }))}
          />
        );
      case 'questions':
        return (
          <Questions 
            topic={state.userTopic}
            responses={state.questionResponses}
            onAnswer={handleQuestionAnswer}
            onComplete={handleQuestionsComplete}
          />
        );
      case 'roadmap':
        return <RoadmapDAG topic={state.userTopic} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-emerald-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Learning <span className="text-emerald-600">Roadmap</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500">
              Your personalized journey to mastery
            </p>
          </div>

          {/* Progress bar */}
          <div className="max-w-xl mx-auto">
            <Progress 
              value={stepProgress[state.currentStep]} 
              className="h-1 bg-emerald-100"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Topic</span>
              <span>Questions</span>
              <span>Roadmap</span>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-8">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
} 