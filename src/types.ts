/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  dimension: 'rhythm' | 'info' | 'collab' | 'knowledge';
  text: string;
  options: {
    text: string;
    value: 'A' | 'B';
    trait: string;
  }[];
}

export interface Archetype {
  id: string;
  name: string;
  title: string;
  description: string;
  celebrity: string;
  behavior: string;
  recommendations: string[];
  percentage: number;
  emoji: string;
  hooks: string;
}
