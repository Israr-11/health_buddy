import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const [googleFitEnabled, setGoogleFitEnabled] = useState(true);
  const [dispenserEnabled, setDispenserEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => router.replace('/') 
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Manage your app preferences
        </Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={[styles.settingSection, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Connections</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="fitness" size={24} color={colors.primary} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Google Fit Integration</Text>
            </View>
            <Switch
              value={googleFitEnabled}
              onValueChange={setGoogleFitEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'white'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="bluetooth" size={24} color={colors.primary} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Smart Dispenser</Text>
            </View>
            <Switch
              value={dispenserEnabled}
              onValueChange={setDispenserEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'white'}
            />
          </View>
        </View>

        <View style={[styles.settingSection, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={24} color={colors.primary} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'white'}
            />
          </View>
        </View>

        <View style={[styles.settingSection, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color={colors.primary} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'white'}
            />
          </View>
        </View>

        <View style={[styles.settingSection, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <TouchableOpacity style={styles.accountButton} onPress={() => Alert.alert("Info", "This would show your profile in a real app")}>
            <View style={styles.settingInfo}>
              <Ionicons name="person" size={24} color={colors.primary} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>View Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accountButton} onPress={handleLogout}>
            <View style={styles.settingInfo}>
              <Ionicons name="log-out" size={24} color={colors.error} />
              <Text style={[styles.settingLabel, { color: colors.error }]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          Health Buddy v1.0.0
        </Text>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          © 2025 Health Buddy, Waterford, Ireland
        </Text>
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
    paddingTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  settingsContainer: {
    flex: 1,
  },
  settingSection: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 5, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  accountButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footer: {
    padding: 20,
    paddingTop: 30, 
    paddingBottom: 30, 
    alignItems: 'center',
    marginTop: 20, 
  },
  footerText: {
    fontSize: 14,
    marginBottom: 5,
  }
});
