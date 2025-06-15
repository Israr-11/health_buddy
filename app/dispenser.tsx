import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DispenserScreen() {
  const [status, setStatus] = useState('disconnected'); 
  const [dispensedItem, setDispensedItem] = useState<{ name: string; amount: string } | null>(null);
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const connectToDispenser = () => {
    setStatus('scanning');
    
    // SIMULATING BLE SCANNING AND CONNECTION
    setTimeout(() => {
      setStatus('connected');
    }, 2000);
  };

  const dispense = () => {
    setStatus('dispensing');
    
    // SIMULATING DISPENSING PROCESS
    setTimeout(() => {
      const supplements = [
        { name: 'Vitamin D', amount: '1000 IU' },
        { name: 'Magnesium', amount: '250 mg' },
        { name: 'Multivitamin', amount: '1 tablet' },
        { name: 'Omega-3', amount: '500 mg' }
      ];
      
      const randomSupplement = supplements[Math.floor(Math.random() * supplements.length)];
      setDispensedItem(randomSupplement);
      setStatus('complete');
    }, 3000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Smart Dispenser</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Connect to your Health Buddy's smart dispenser
        </Text>
      </View>

      <View style={[styles.dispenserContainer, { backgroundColor: colors.card }]}>
        <View style={styles.dispenserIcon}>
          <Ionicons 
            name={status === 'disconnected' ? "bluetooth-outline" : "bluetooth"} 
            size={50} 
            color={status === 'disconnected' ? colors.icon : colors.primary} 
          />
        </View>
        
        <Text style={[styles.statusText, { color: colors.text }]}>
          {status === 'disconnected' && "Dispenser Disconnected"}
          {status === 'scanning' && "Scanning for Dispenser..."}
          {status === 'connected' && "Dispenser Connected"}
          {status === 'dispensing' && "Dispensing Supplement..."}
          {status === 'complete' && "Supplement Dispensed!"}
        </Text>
        
        {status === 'scanning' && (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        )}
        
        {status === 'dispensing' && (
          <ActivityIndicator size="large" color={colors.secondary} style={styles.loader} />
        )}
        
        {status === 'complete' && dispensedItem && (
          <View style={styles.resultContainer}>
            <Ionicons name="checkmark-circle" size={40} color={colors.success} />
            <Text style={[styles.dispensedName, { color: colors.text }]}>{dispensedItem.name}</Text>
            <Text style={[styles.dispensedAmount, { color: colors.secondary }]}>{dispensedItem.amount}</Text>
          </View>
        )}
        
        {status === 'disconnected' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={connectToDispenser}
          >
            <Text style={styles.actionButtonText}>Connect to Dispenser</Text>
          </TouchableOpacity>
        )}
        
        {status === 'connected' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={dispense}
          >
            <Text style={styles.actionButtonText}>Dispense Supplement</Text>
          </TouchableOpacity>
        )}
        
        {status === 'complete' && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.actionButtonText}>Return to Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>How it works</Text>
        <View style={styles.infoItem}>
          <Ionicons name="bluetooth" size={24} color={colors.primary} style={styles.infoIcon} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Connect to your  Health Buddy's smart dispenser via Bluetooth
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="analytics" size={24} color={colors.primary} style={styles.infoIcon} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            The app analyzes your health data to recommend supplements
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="medkit" size={24} color={colors.primary} style={styles.infoIcon} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Your dispenser provides the exact supplement dosage you need
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  dispenserContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dispenserIcon: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dispensedName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dispensedAmount: {
    fontSize: 18,
    marginTop: 5,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
});
