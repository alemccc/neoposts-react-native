import type { RefObject } from 'react';

import type { FlatList } from 'react-native';

export const scrollToTop = <T>(
	ref: RefObject<FlatList<T> | null>,
	animated = false,
) => {
	ref.current?.scrollToOffset({ offset: 0, animated });
};
