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
import { Container } from 'rue';
import ConvictConfigProvider from '../../lib/convict/ConvictConfigProvider';
import ConvictConfigProviderBuilder from '../../lib/convict/ConvictConfigProviderBuilder';

describe('./convict/ConvictConfigProviderBuilder.js', () => {

  let schema = {
    value: {
      doc: 'Test',
      format: String,
      default: 'not-set',
    },
  };

  describe('ConvictConfigProviderBuilder.configure()', () => {

    it('initializes a Convict config instance and returns a builder', () => {
      // Setup

      let container = new Container();

      // Execute
      let builder = ConvictConfigProviderBuilder.configure(schema, container);

      // Assert
      expect(builder.convictConfig).not.toBeUndefined();
      expect(builder.convictConfig).not.toBeNull();
      expect(builder.convictConfig.get('value')).toEqual('not-set');
      expect(builder).toBeInstanceOf(ConvictConfigProviderBuilder);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(ConvictConfigProvider);
    });

  });

  describe('.withFiles()', () => {

    it('loads the given configuration files', () => {
      // Setup
      let container = new Container();
      let builder = ConvictConfigProviderBuilder.configure(schema, container);

      // Execute
      builder.withFiles(__dirname + '/test1.json', __dirname + '/test2.json');

      // Assert
      expect(builder.convictConfig.get('value')).toEqual('set-value');
    });

  });

});
