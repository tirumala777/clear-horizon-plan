
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Line, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, PieChart, Target } from 'lucide-react';

// 3D Chart Components
const AnimatedBar = ({ position, height, color, delay = 0 }: { 
  position: [number, number, number]; 
  height: number; 
  color: string; 
  delay?: number; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [animatedHeight, setAnimatedHeight] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      const targetHeight = height;
      const currentHeight = animatedHeight;
      const newHeight = THREE.MathUtils.lerp(currentHeight, targetHeight, 0.05);
      setAnimatedHeight(newHeight);
      
      meshRef.current.scale.y = newHeight;
      meshRef.current.position.y = position[1] + (newHeight - 1) * 0.5;
      
      // Add subtle floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + delay) * 0.02;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[0.3, 1, 0.3]}
    >
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </Box>
  );
};

const RotatingChart = ({ data }: { data: number[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += isHovered ? 0.02 : 0.005;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {data.map((value, index) => (
        <AnimatedBar
          key={index}
          position={[(index - data.length / 2) * 0.8, 0, 0]}
          height={value / 100}
          color={`hsl(${210 + index * 30}, 70%, ${50 + value / 10}%)`}
          delay={index * 0.2}
        />
      ))}
    </group>
  );
};

const FloatingMetricSphere = ({ 
  position, 
  value, 
  label, 
  color 
}: { 
  position: [number, number, number]; 
  value: string; 
  label: string; 
  color: string; 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Sphere>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {label}
      </Text>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {value}
      </Text>
    </group>
  );
};

const Scene3D = () => {
  // Sample data for charts
  const chartData = [45, 78, 62, 91, 55, 73, 88, 64];
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={3}
      />
      
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* 3D Chart */}
      <RotatingChart data={chartData} />
      
      {/* Floating Metrics */}
      <FloatingMetricSphere
        position={[-4, 2, 0]}
        value="₹56L"
        label="Revenue"
        color="#3b82f6"
      />
      
      <FloatingMetricSphere
        position={[4, 2, 0]}
        value="1,740"
        label="Users"
        color="#10b981"
      />
      
      <FloatingMetricSphere
        position={[-4, -2, 0]}
        value="28%"
        label="Growth"
        color="#f59e0b"
      />
      
      <FloatingMetricSphere
        position={[4, -2, 0]}
        value="3.4%"
        label="Conversion"
        color="#8b5cf6"
      />
      
      {/* Animated Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.3}
          wireframe
        />
      </mesh>
    </>
  );
};

const ThreeDDashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'portfolio'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigationButtons = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Financial Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              3D Financial Analytics
            </h1>
            <p className="text-blue-200">
              Interactive real-time financial dashboard
            </p>
          </div>
          
          {/* Navigation Pills */}
          <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-1">
            {navigationButtons.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeView === id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView(id as typeof activeView)}
                className={`rounded-full transition-all duration-300 ${
                  activeView === id 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-blue-200 hover:text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          shadows
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Stats Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">₹56,00,000</div>
                <div className="text-sm text-blue-200">Monthly Revenue</div>
                <Badge className="mt-2 bg-green-500/20 text-green-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +25%
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">1,740</div>
                <div className="text-sm text-blue-200">Active Users</div>
                <Badge className="mt-2 bg-blue-500/20 text-blue-300">
                  +18%
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">28%</div>
                <div className="text-sm text-blue-200">Growth Rate</div>
                <Badge className="mt-2 bg-yellow-500/20 text-yellow-300">
                  +8%
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">3.4%</div>
                <div className="text-sm text-blue-200">Conversion</div>
                <Badge className="mt-2 bg-purple-500/20 text-purple-300">
                  +12%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Helper */}
      <div className="absolute top-20 right-6 z-20">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
          <div className="text-white text-sm space-y-1">
            <div>🖱️ Click & drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>✨ Hover over elements</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThreeDDashboard;
