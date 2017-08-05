/**
 * Rue - nodejs dependency injection container
 *
 * Copyright 2017 Martin Crawford (@bemisguided)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow
 */
import { Container, singleton } from 'rue';
import rueConfigConvict from '../lib/rue-config-convict';
import ConvictConfigProvider from '../lib/convict/ConvictConfigProvider';
import ConvictConfigProviderBuilder from '../lib/convict/ConvictConfigProviderBuilder';


describe('./rue-config-convict.js', () => {

  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('rue.configure()', () => {

    it('creates a builder with a given Container for a given Convict Schema', () => {
      // Execute
      let builder = rueConfigConvict.configure({}, container);

      // Assert
      expect(builder).toBeInstanceOf(ConvictConfigProviderBuilder);
      expect(builder.container).toBe(container);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(ConvictConfigProvider);
    });

    it('creates a builder with a the singleton Container for a given Convict Schema', () => {
      // Execute
      let builder = rueConfigConvict.configure({});

      // Assert
      expect(builder).toBeInstanceOf(ConvictConfigProviderBuilder);
      expect(builder.container).toBe(singleton);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(ConvictConfigProvider);
    });

  });

});
