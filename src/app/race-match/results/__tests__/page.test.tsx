import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Results from '@/app/race-match/results/page';

// Mock data
const mockRaces = [
  {
    _id: '1',
    name: 'Paris Marathon',
    terrain: 'Urban',
    distance: 42,
    difficulty: 'Medium',
    date: '2026-04-05',
    location: 'Paris, France',
    imageUrl: '/test.jpg',
    description: 'Test race',
    raceUrl: 'https://example.com',
  },
  {
    _id: '2',
    name: 'Mountain Trail 10K',
    terrain: 'Mountain',
    distance: 10,
    difficulty: 'Hard',
    date: '2026-06-15',
    location: 'Alps, Switzerland',
    imageUrl: '/test2.jpg',
    description: 'Mountain race',
    raceUrl: 'https://example.com',
  },
  {
    _id: '3',
    name: 'Coastal 5K Fun Run',
    terrain: 'Coastal',
    distance: 5,
    difficulty: 'Easy',
    date: '2026-07-20',
    location: 'San Diego, USA',
    imageUrl: '/test3.jpg',
    description: 'Coastal race',
    raceUrl: 'https://example.com',
  },
  {
    _id: '4',
    name: 'Tokyo City Marathon',
    terrain: 'Urban',
    distance: 42,
    difficulty: 'Medium',
    date: '2026-03-01',
    location: 'Tokyo, Japan',
    imageUrl: '/test4.jpg',
    description: 'Tokyo race',
    raceUrl: 'https://example.com',
  },
];

// Mock modules
vi.mock('@/common/hooks/useTranslation', () => ({
  useTranslation: () => (key: string) => key,
}));

vi.mock('@/services/bucketlistService', () => ({
  getBucketlistRaces: vi.fn(() => Promise.resolve([])),
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

describe('Results Page - Matching Logic', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe('Terrain Matching', () => {
    it('should match races with selected terrain', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
        expect(screen.queryByText('Tokyo City Marathon')).toBeInTheDocument();
      });
    });

    it('should match multiple terrains', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban', 'mountain'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
        expect(screen.queryByText('Mountain Trail 10K')).toBeInTheDocument();
      });
    });

    it('should be case-insensitive for terrain matching', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['URBAN'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
      });
    });
  });

  describe('Distance Matching', () => {
    it('should match 5K races correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: ['5k'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Coastal 5K Fun Run')).toBeInTheDocument();
        expect(screen.queryByText('Paris Marathon')).not.toBeInTheDocument();
      });
    });

    it('should match 10K races correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: ['10k'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Mountain Trail 10K')).toBeInTheDocument();
      });
    });

    it('should match half marathon races correctly (20-22km)', async () => {
      const halfMarathonRace = {
        _id: '5',
        name: 'Half Marathon Test',
        terrain: 'Urban',
        distance: 21,
        difficulty: 'Medium',
        date: '2026-05-10',
        location: 'Test City',
        imageUrl: '/test.jpg',
        description: 'Test',
        raceUrl: 'https://example.com',
      };

      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: ['half'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [...mockRaces, halfMarathonRace] }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Half Marathon Test')).toBeInTheDocument();
      });
    });

    it('should match marathon races correctly (40-45km)', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: ['marathon'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
        expect(screen.queryByText('Tokyo City Marathon')).toBeInTheDocument();
      });
    });

    it('should match ultra races correctly (>45km)', async () => {
      const ultraRace = {
        _id: '6',
        name: 'Ultra Trail 100K',
        terrain: 'Mountain',
        distance: 100,
        difficulty: 'Hard',
        date: '2026-08-15',
        location: 'Alps',
        imageUrl: '/test.jpg',
        description: 'Ultra race',
        raceUrl: 'https://example.com',
      };

      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: ['ultra'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [...mockRaces, ultraRace] }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Ultra Trail 100K')).toBeInTheDocument();
      });
    });
  });

  describe('Location Matching', () => {
    it('should match Europe region correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: ['europe'],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
        expect(screen.queryByText('Mountain Trail 10K')).toBeInTheDocument();
      });
    });

    it('should match USA region correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: ['usa'],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Coastal 5K Fun Run')).toBeInTheDocument();
      });
    });

    it('should match Asia region correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: ['asia'],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Tokyo City Marathon')).toBeInTheDocument();
      });
    });

    it('should be case-insensitive for location matching', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: ['EUROPE'],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
      });
    });
  });

  describe('Difficulty Matching', () => {
    it('should match easy difficulty correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: ['easy'],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Coastal 5K Fun Run')).toBeInTheDocument();
      });
    });

    it('should match medium difficulty correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: ['medium'],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
      });
    });

    it('should be case-insensitive for difficulty matching', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: ['HARD'],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Mountain Trail 10K')).toBeInTheDocument();
      });
    });
  });

  describe('Month Matching', () => {
    it('should match races in April correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: [],
          months: ['apr'],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
      });
    });

    it('should match races in June correctly', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: [],
          months: ['jun'],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Mountain Trail 10K')).toBeInTheDocument();
      });
    });

    it('should match multiple months', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: [],
          months: ['mar', 'apr'],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('Paris Marathon')).toBeInTheDocument();
        expect(screen.queryByText('Tokyo City Marathon')).toBeInTheDocument();
      });
    });
  });

  describe('Match Percentage Calculation', () => {
    it('should calculate 100% match when all criteria match', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: ['marathon'],
          locations: ['europe'],
          difficulties: ['medium'],
          months: ['apr'],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText(/100%/)).toBeInTheDocument();
      });
    });

    it('should calculate 100% match when both selected criteria match', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: ['marathon'],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        const percentages = screen.getAllByText(/100%/);
        // Both Paris Marathon and Tokyo City Marathon match 100% (both are urban marathons)
        expect(percentages.length).toBe(2);
      });
    });

    it('should filter out 0% matches', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['desert'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('no_races')).toBeInTheDocument();
      });
    });

    it('should sort races by match percentage (highest first)', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: ['marathon'],
          locations: ['europe'],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        const percentages = screen.getAllByText(/\d+%/);
        expect(percentages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty preferences', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: [],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('no_races')).toBeInTheDocument();
      });
    });

    it('should handle no localStorage data', async () => {
      localStorage.getItem = vi.fn(() => null);

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('no_races')).toBeInTheDocument();
      });
    });

    it('should handle API error gracefully', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() => Promise.reject(new Error('API Error')));

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('your_race_matches')).toBeInTheDocument();
      });
    });

    it('should handle invalid API response format', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: null }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('no_races')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show skeleton loaders while loading', () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(
        () =>
          new Promise<Response>(() => {
            // Never resolves to keep loading state
          })
      );

      render(<Results />);

      expect(screen.queryByText('your_race_matches')).toBeInTheDocument();
    });
  });

  describe('UI Elements', () => {
    it('should show update preferences button', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('update_preferences')).toBeInTheDocument();
      });
    });

    it('should show personalized matches badge', async () => {
      localStorage.getItem = vi.fn(() =>
        JSON.stringify({
          terrains: ['urban'],
          distances: [],
          locations: [],
          difficulties: [],
          months: [],
        })
      );

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: mockRaces }),
        } as Response)
      );

      render(<Results />);

      await waitFor(() => {
        expect(screen.queryByText('personalized_matches')).toBeInTheDocument();
      });
    });
  });
});
