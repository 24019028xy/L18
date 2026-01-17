import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Image } from 'react-native';

// Replace with your Render web service URL
const API_URL = 'https://onlinepetappwebservice-vr5e.onrender.com/pets';

export default function App() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [filterName, setFilterName] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterAge, setFilterAge] = useState('');

    // Fetch pets from Render API
    const fetchPets = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setPets(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    // Apply all filters
    const filteredPets = pets.filter(pet =>
        pet.name.toLowerCase().includes(filterName.toLowerCase()) &&
        pet.type.toLowerCase().includes(filterType.toLowerCase()) &&
        (filterAge === '' || pet.age.toString() === filterAge)
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <StatusBar style="auto" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Pets</Text>

            <TextInput
                style={styles.input}
                placeholder="Filter by name"
                value={filterName}
                onChangeText={setFilterName}
            />
            <TextInput
                style={styles.input}
                placeholder="Filter by type"
                value={filterType}
                onChangeText={setFilterType}
            />
            <TextInput
                style={styles.input}
                placeholder="Filter by age"
                value={filterAge}
                onChangeText={setFilterAge}
                keyboardType="numeric"
            />

            <FlatList
                data={filteredPets}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {/* Display pet image */}
                        <Image
                            source={{ uri: item.imagelink }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Type: {item.type}</Text>
                        <Text>Age: {item.age}</Text>
                    </View>
                )}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center', // centers the content horizontally
    },
    name: { fontWeight: 'bold', fontSize: 18, marginTop: 5 },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
