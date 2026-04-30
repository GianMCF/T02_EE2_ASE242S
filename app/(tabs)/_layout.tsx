import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#b90000',
        tabBarInactiveTintColor: '#777',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'Nosotros',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.2.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="cart.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="bag.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contacto',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="envelope.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}