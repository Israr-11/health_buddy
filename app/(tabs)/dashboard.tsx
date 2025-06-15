import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// MOCK DATA FOR HEALTH METRICS
const generateMockData = () => {
  return {
    steps: Math.floor(Math.random() * 8000) + 2000,
    sleep: (Math.random() * 4 + 4).toFixed(1),
    water: Math.floor(Math.random() * 1500) + 500,
    heartRate: Math.floor(Math.random() * 30) + 60,
  };
};

export default function Dashboard() {
  const [healthData, setHealthData] = useState(generateMockData());
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setHealthData(generateMockData());
      setRefreshing(false);
    }, 1000);
  };

  // DETERMINING SUGGESTED SUPPLEMENT BASED ON HEALTH DATA
  const getSuggestedSupplement = () => {
    if (healthData.steps < 5000) return "Vitamin D";
    if (parseFloat(healthData.sleep) < 6) return "Magnesium";
    if (healthData.water < 1000) return "Electrolytes";
    return "Multivitamin";
  };

  // GETTING HEALTH TIPS BASED ON DATA
  const getHealthTip = () => {
    if (healthData.steps < 5000) 
      return "Try to walk more today to reach your step goal.";
    if (parseFloat(healthData.sleep) < 6) 
      return "You may need more sleep. Try to go to bed earlier tonight.";
    if (healthData.water < 1000)
      return "Remember to stay hydrated throughout the day.";
    return "You're doing great! Keep up the healthy habits.";
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
      }
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>Hello, Israr!</Text>
        <Text style={[styles.date, { color: colors.icon }]}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      <View style={styles.tipContainer}>
        <Text style={[styles.tipText, { color: colors.text }]}>
          {getHealthTip()}
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="footsteps" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Steps</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{healthData.steps}</Text>
          <Text style={[styles.metricGoal, { color: colors.icon }]}>Goal: 10,000</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="moon" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Sleep</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{healthData.sleep} hrs</Text>
          <Text style={[styles.metricGoal, { color: colors.icon }]}>Goal: 8 hours</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="water" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Water</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{healthData.water} ml</Text>
          <Text style={[styles.metricGoal, { color: colors.icon }]}>Goal: 2000 ml</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="heart" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Heart Rate</Text>
          </View>
          <Text style={[styles.metricValue, { color: colors.primary }]}>{healthData.heartRate} bpm</Text>
          <Text style={[styles.metricGoal, { color: colors.icon }]}>Resting</Text>
        </View>
      </View>

      <View style={[styles.supplementCard, { backgroundColor: colors.card }]}>
        <View style={styles.supplementHeader}>
          <Ionicons name="leaf" size={28} color={colors.secondary} />
          <Text style={[styles.supplementTitle, { color: colors.text }]}>Suggested Supplement</Text>
        </View>
        <Text style={[styles.supplementName, { color: colors.secondary }]}>
          {getSuggestedSupplement()}
        </Text>
        <TouchableOpacity 
          style={[styles.dispenserButton, { backgroundColor: colors.secondary }]}
          onPress={() => router.push('../dispenser')}
        >
          <Text style={styles.dispenserButtonText}>Connect to Dispenser</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity 
          style={[styles.navButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('./settings')}
        >
          <Ionicons name="settings-outline" size={20} color="white" />
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginTop: 5,
  },
  tipContainer: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
  },
  tipText: {
    fontSize: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricGoal: {
    fontSize: 14,
    marginTop: 5,
  },
  supplementCard: {
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  supplementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  supplementTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  supplementName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dispenserButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  dispenserButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
